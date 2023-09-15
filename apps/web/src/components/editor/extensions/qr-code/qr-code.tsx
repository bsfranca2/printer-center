import { NodeViewWrapper } from '@tiptap/react';
import { QRCodeSVG } from 'qrcode.react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@printer-center/ui-components/components/ui/popover';
import { Input } from '@printer-center/ui-components/components/ui/input';
import { Label } from '@printer-center/ui-components/components/ui/label';
import { Toggle } from '@printer-center/ui-components/components/ui/toggle';
import { AlignCenter, AlignLeft, AlignRight } from 'lucide-react';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { cn } from '@printer-center/ui-components/utils';

const toggleGroupItemClasses =
  'hover:bg-gray-100 color-gray-600 data-[state=on]:text-blue-500 flex h-[35px] w-[35px] items-center justify-center bg-white text-base leading-4 first:rounded-l last:rounded-r focus:z-10 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none';

export const QrCode = (props: any) => {
  return (
    <NodeViewWrapper
      className={cn(
        props.node.attrs.textAlign === 'center' && 'text-center',
        props.node.attrs.textAlign === 'left' && 'text-start',
        props.node.attrs.textAlign === 'right' && 'text-right'
      )}
    >
      <Popover>
        <PopoverTrigger>
          <QRCodeSVG
            value={props.node.attrs.data}
            size={props.node.attrs.size}
            level={props.node.attrs.level}
          />
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="qrcode-align">Align</Label>
                <ToggleGroup.Root
                  className="inline-flex space-x-px divide-x divide-gray-200 rounded border"
                  type="single"
                  aria-label="Text alignment"
                  value={props.node.attrs.textAlign}
                  onValueChange={(value) => {
                    props.updateAttributes({ textAlign: value.trim() ? value : 'center' });
                  }}
                >
                  <ToggleGroup.Item
                    className={toggleGroupItemClasses}
                    value="left"
                    aria-label="Left aligned"
                  >
                    <AlignLeft size={20} />
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    className={toggleGroupItemClasses}
                    value="center"
                    aria-label="Center aligned"
                  >
                    <AlignCenter size={20} />
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    className={toggleGroupItemClasses}
                    value="right"
                    aria-label="Right aligned"
                  >
                    <AlignRight size={20} />
                  </ToggleGroup.Item>
                </ToggleGroup.Root>
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="qrcode-data">Data</Label>
                <Input
                  id="qrcode-data"
                  className="col-span-2 h-8"
                  value={props.node.attrs.data}
                  onChange={(e) => props.updateAttributes({ data: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="qrcode-size">Size</Label>
                <Input
                  id="qrcode-size"
                  className="col-span-2 h-8"
                  value={props.node.attrs.size}
                  onChange={(e) => props.updateAttributes({ size: e.target.value })}
                  disabled={true}
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="qrcode-level">Level</Label>
                <Input
                  id="qrcode-level"
                  className="col-span-2 h-8"
                  value={props.node.attrs.level}
                  onChange={(e) => props.updateAttributes({ level: e.target.value })}
                />
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </NodeViewWrapper>
  );
};
