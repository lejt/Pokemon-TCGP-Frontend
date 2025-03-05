export const getBackgroundColor = (setName: string) => {
  let color;

  switch (setName) {
    case 'Space-Time Smackdown':
      color =
        'bg-[linear-gradient(354deg,_rgba(255,255,255,1)_0%,_rgba(255,255,255,1)_50%,_rgba(164,153,153,1)_50%,_rgba(207,147,197,1)_75%,_rgba(144,167,221,1)_90%)]';
      break;
    case 'Genetic Apex':
      color =
        'bg-[linear-gradient(354deg,_rgba(255,255,255,1)_0%,_rgba(255,255,255,1)_50%,_rgba(154,104,235,1)_50%,_rgba(250,147,247,1)_75%,_rgba(250,143,200,1)_100%)]';
      break;
    case 'Mythical Island':
      color =
        'bg-[linear-gradient(354deg,_rgba(255,255,255,1)_0%,_rgba(255,255,255,1)_50%,_rgba(81,215,207,1)_50%,_rgba(106,255,246,1)_75%,_rgba(91,176,255,1)_100%)]';
      break;
    case 'Triumphant Light':
      color =
        'bg-[linear-gradient(354deg,_rgba(255,255,255,1)_0%,_rgba(255,255,255,1)_50%,_rgba(255,194,0,1)_50%,_rgba(221,238,142,1)_70%,_rgba(247,158,40,1)_100%)]';
      break;
    default:
      color =
        'bg-[linear-gradient(354deg,_rgba(255,255,255,1)_0%,_rgba(255,255,255,1)_50%,_rgba(81,215,207,1)_50%,_rgba(106,255,246,1)_75%,_rgba(91,176,255,1)_90%)]';
  }

  return color;
};
