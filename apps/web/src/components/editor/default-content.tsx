export const defaultEditorContent = {
  type: 'doc',
  content: [
    { type: 'qrCode', attrs: { data: '123456789', size: '64', level: 'L', textAlign: 'center' } },
    {
      type: 'paragraph',
      attrs: { textAlign: 'center' },
      content: [{ type: 'text', text: 'Prescrição nº PRESC1-870' }],
    },
    {
      type: 'paragraph',
      attrs: { textAlign: 'center' },
      content: [{ type: 'text', text: '31/08/2023 09:41:57' }],
    },
    { type: 'paragraph', attrs: { textAlign: 'left' } },
    {
      type: 'paragraph',
      attrs: { textAlign: 'left' },
      content: [
        { type: 'text', marks: [{ type: 'bold' }], text: 'Paciente:' },
        { type: 'text', text: ' PACIENTE TESTE' },
      ],
    },
    {
      type: 'paragraph',
      attrs: { textAlign: 'left' },
      content: [
        { type: 'text', marks: [{ type: 'bold' }], text: 'Setor/Leito:' },
        { type: 'text', text: ' C3-125-HUB' },
      ],
    },
    {
      type: 'paragraph',
      attrs: { textAlign: 'left' },
      content: [
        { type: 'text', marks: [{ type: 'bold' }], text: 'Atendimento:' },
        { type: 'text', text: ' 2450522' },
      ],
    },
    { type: 'paragraph', attrs: { textAlign: 'left' } },
    {
      type: 'paragraph',
      attrs: { textAlign: 'left' },
      content: [
        { type: 'text', marks: [{ type: 'bold' }], text: 'Horário:' },
        { type: 'text', text: ' 12:00hrs' },
      ],
    },
    { type: 'horizontalRule' },
    {
      type: 'paragraph',
      attrs: { textAlign: 'left' },
      content: [{ type: 'text', text: '01x ACETILCISTEINA AMP 100MG' }],
    },
    {
      type: 'paragraph',
      attrs: { textAlign: 'left' },
      content: [{ type: 'text', text: 'VIA ORAL' }],
    },
  ],
};
