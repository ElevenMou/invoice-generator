const pdfTemplate = [
  {
    id: "default",
    name: "Default",
    image: "default.png",
    template: require("./Document-01.tsx").default,
    colors: [
      {
        label: "Primary",
        value: "#5358e4",
      },
      {
        label: "Text",
        value: "#121722",
      },
      {
        label: "Text Light",
        value: "#60737D",
      },
      {
        label: "Background",
        value: "#ffffff",
      },
      {
        label: "Card",
        value: "#F2F5F9",
      },
    ],
  },
];

export default pdfTemplate;
