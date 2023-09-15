/// <reference types="w3c-web-usb" />
/// <reference types="@types/dom-serial" />
import { EditorContent, useEditor } from '@tiptap/react';
import { WysiwygParser, getPrinter } from '@printer-center/core';
import { Button } from '@printer-center/ui-components';
import { defaultExtensions } from './extensions';
import { defaultEditorProps } from './props';
import { EditorBubbleMenu } from './bubble-menu';
import { useState } from 'react';
import { defaultEditorContent } from './default-content';

export const Editor = () => {
  const [port, setPort] = useState<any>(null);

  const editor = useEditor({
    extensions: defaultExtensions,
    editorProps: defaultEditorProps,
    autofocus: 'end',
    content: defaultEditorContent,
  });

  function getData() {
    if (!editor) {
      alert('Editor not provided');
      throw new Error('Editor not provided');
    }
    const printer = getPrinter({ type: 'epson' });
    const parser = new WysiwygParser(printer);
    return parser.parse(editor.getJSON());
  }

  async function print() {
    if (!('usb' in navigator)) {
      return alert('Browser doesnt support usb');
    }
    try {
      const data = getData();
      const device = await navigator.usb.requestDevice({ filters: [{ vendorId: 0x04b8 }] });
      await device.open();
      await device.selectConfiguration(device.configurations[0].configurationValue);
      await device.claimInterface(device.configuration?.interfaces[0].interfaceNumber ?? 0);
      await device.controlTransferOut(
        {
          requestType: 'class',
          recipient: 'interface',
          request: 0x22,
          value: 0x01,
          index: 0x02,
        },
        data
      );
      await device.forget();
    } catch (error) {
      alert('Falha ao tentar imprimir: ' + error);
    }
  }

  async function printCOM() {
    try {
      let _port = port;
      if (_port == null) {
        _port = await navigator.serial.requestPort();
        await _port.open({ baudRate: 9600 });
        setPort(_port);
      }

      const writer = _port.writable?.getWriter();
      if (writer != null) {
        const data = getData();

        await writer.write(data);
        writer.releaseLock();
      }
    } catch (error) {
      console.log(error);
      alert(`Falha na impressao: ${error}`);
    }
  }

  function debug() {
    const data = getData();
    console.log('data', data);
    console.log(editor?.getJSON());
  }

  function clean() {
    editor?.chain().focus().setContent('<p>Hello World!</p>').run();
  }

  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex justify-between">
        <Button onClick={() => clean()}>Clean</Button>
        <span className="flex gap-x-1">
          <Button onClick={() => debug()}>Debug</Button>
          <Button onClick={() => printCOM()}>Print COM</Button>
          <Button onClick={() => print()}>Print USB</Button>
        </span>
      </div>
      <div className="bg-white" onClick={() => editor?.chain().focus().run()}>
        {editor && <EditorBubbleMenu editor={editor} />}
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};
