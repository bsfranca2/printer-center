import { NodeViewWrapper } from '@tiptap/react';
import { QRCodeSVG } from 'qrcode.react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@printer-center/ui-components/components/ui/popover';
import { Input } from '@printer-center/ui-components/components/ui/input';
import { Label } from '@printer-center/ui-components/components/ui/label';

export const QrCode = (props) => {
  return (
    <NodeViewWrapper>
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
