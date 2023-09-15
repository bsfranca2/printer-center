import { mergeAttributes, Node } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { QrCode } from './qr-code';

export default Node.create({
  name: 'qrCode',

  group: 'block',

  atom: true,

  addAttributes() {
    return {
      data: {
        default: '123456789',
      },
      size: {
        default: '64',
      },
      level: {
        default: 'L',
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'qr-code',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['qr-code', mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    return ReactNodeViewRenderer(QrCode);
  },
});
