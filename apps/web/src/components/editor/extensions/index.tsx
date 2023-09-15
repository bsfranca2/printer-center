import Document from '@tiptap/extension-document';
import Text from '@tiptap/extension-text';
import Paragraph from '@tiptap/extension-paragraph';
import Placeholder from '@tiptap/extension-placeholder';
import Bold from '@tiptap/extension-bold';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import DropCursor from '@tiptap/extension-dropcursor';
import Highlight from '@tiptap/extension-highlight';
import DragAndDrop from './drag-and-drop';
import SlashCommand from './slash-command';
import CustomKeymap from './custom-keymap';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import QrCode from './qr-code/index';
import Gapcursor from '@tiptap/extension-gapcursor';

export const defaultExtensions = [
  Document,
  Text,
  Paragraph,
  Placeholder.configure({
    placeholder: "Write something or press '/' for commands...",
    includeChildren: true,
  }),
  Bold,
  Underline,
  TextAlign.configure({ types: ['paragraph'] }),
  DropCursor.configure({
    color: '#DBEAFE',
    width: 4,
  }),
  HorizontalRule.configure({
    HTMLAttributes: {
      class: 'my-1 border-t-foreground border-dashed',
    },
  }),
  SlashCommand,
  Highlight,
  CustomKeymap,
  DragAndDrop,
  QrCode,
  Gapcursor,
];
