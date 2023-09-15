import { BubbleMenu, BubbleMenuProps, isNodeSelection } from '@tiptap/react';
import { FC, useState } from 'react';
import {
  BoldIcon,
  UnderlineIcon,
  ContrastIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from 'lucide-react';
// import { NodeSelector } from './node-selector';
import { cn } from '@printer-center/ui-components/utils';

export interface BubbleMenuItem {
  name: string;
  isActive: () => boolean;
  command: () => void;
  icon: typeof BoldIcon;
}

type EditorBubbleMenuProps = Omit<BubbleMenuProps, 'children'>;

export const EditorBubbleMenu: FC<EditorBubbleMenuProps> = (props) => {
  const items: BubbleMenuItem[] = [
    {
      name: 'bold',
      isActive: () => props.editor.isActive('bold'),
      command: () => props.editor.chain().focus().toggleBold().run(),
      icon: BoldIcon,
    },
    {
      name: 'underline',
      isActive: () => props.editor.isActive('underline'),
      command: () => props.editor.chain().focus().toggleUnderline().run(),
      icon: UnderlineIcon,
    },
    {
      name: 'inverted',
      isActive: () => props.editor.isActive('highlight'),
      command: () => props.editor.chain().focus().toggleHighlight().run(),
      icon: ContrastIcon,
    },
    {
      name: 'align-left',
      isActive: () => props.editor.isActive({ textAlign: 'left' }),
      command: () => props.editor.chain().focus().setTextAlign('left').run(),
      icon: AlignLeft,
    },
    {
      name: 'align-center',
      isActive: () => props.editor.isActive({ textAlign: 'center' }),
      command: () => props.editor.chain().focus().setTextAlign('center').run(),
      icon: AlignCenter,
    },
    {
      name: 'align-right',
      isActive: () => props.editor.isActive({ textAlign: 'right' }),
      command: () => props.editor.chain().focus().setTextAlign('right').run(),
      icon: AlignRight,
    },
  ];

  const bubbleMenuProps: EditorBubbleMenuProps = {
    ...props,
    shouldShow: ({ state, editor }) => {
      const { selection } = state;
      const { empty } = selection;

      // don't show bubble menu if:
      // - the selected node is an image
      // - the selection is empty
      // - the selection is a node selection (for drag handles)
      if (editor.isActive('image') || empty || isNodeSelection(selection)) {
        return false;
      }
      return true;
    },
    tippyOptions: {
      moveTransition: 'transform 0.15s ease-out',
      onHidden: () => {
        setIsNodeSelectorOpen(false);
      },
    },
  };

  const [isNodeSelectorOpen, setIsNodeSelectorOpen] = useState(false);

  return (
    <BubbleMenu
      {...bubbleMenuProps}
      className="flex w-fit divide-x divide-stone-200 rounded border border-stone-200 bg-white shadow-xl"
    >
      {/* <NodeSelector
        editor={props.editor}
        isOpen={isNodeSelectorOpen}
        setIsOpen={() => {
          setIsNodeSelectorOpen(!isNodeSelectorOpen);
        }}
      /> */}
      <div className="flex">
        {items.map((item, index) => (
          <button
            key={index}
            onClick={item.command}
            className="p-2 text-stone-600 hover:bg-stone-100 active:bg-stone-200"
            type="button"
          >
            <item.icon
              className={cn('h-4 w-4', {
                'text-blue-500': item.isActive(),
              })}
            />
          </button>
        ))}
      </div>
    </BubbleMenu>
  );
};
