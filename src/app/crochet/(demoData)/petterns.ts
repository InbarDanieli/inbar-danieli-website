import { IProgressPatternCard } from "../(types)/dashbaord.types";

const imageUrl =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAmz-zsLF2DPjuBzbNoX4IVFW5yUiTEt2FjCoXstKFaxkoOcjKOxRAkQPJOnBC5qa03qHsBfIMBD-JRU1biwEhfuNhkxLTeKbffJjLS51h-TLiwcZS8CrCb1Ct3LtcJkmYHbrmPfWUjtW69z4kxxkgKbLzGBQnVjbjpAIu_AcZWMa0w_TZAqKUP6V9HxsE13OUXyD4ce7FTLZ43eQ_SG7NtMa3Ia-Un-_UXiklXTxS8sw8KcLgqVJ2wfInJqOkHogSAlCBsFhlBtFQ0";

export const progressPatterns: IProgressPatternCard[] = [
  {
    id: "1",
    title: "Pattern 1",
    image: imageUrl,
    progress: 90,
  },
  {
    id: "2",
    title: "Pattern 2",
    image: imageUrl,
    progress: 70,
  },
  {
    id: "3",
    title: "Pattern 3",
    image: imageUrl,
    progress: 30,
  },
];
