import { IYarnSchema } from "@/types/yarn.types";

const yarnImageUrl =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuATOCwoya_1g5dpZb9mQkw0f0vfpZQXAVutKLbWF2NQ_BK21d_DI2fBXhkjbUlemtjlev33B8DK4jhx2YzGIUeTHSvqB19WirKzCdTd6buEK5u2k9VQDlr806Uj0R2-CHiOoZNpc8m9d0dcWWXkT8dPAz75pJgrFvIO85pWOsXBEMdGtziJ8QWkKlwvvtoJOcCM0Af9QZ9lbIVoed4tlLOxAvQEa4YPl33gl-AL-puoIgVaYJv4EYIqhE62FAIt06ke_1ukiDOhIeBM";

export const yarns: IYarnSchema[] = [
  {
    _id: "1",
    name: "Yarn 1",
    color: "Red",
    colorTag: "Red",
    image: yarnImageUrl,
    company: "Company 1",
    materials: {
      cotton: 50,
      wool: 50,
    },
  },
  {
    _id: "2",
    name: "Yarn 1",
    color: "Red",
    colorTag: "Red",
    image: yarnImageUrl,
    company: "Company 1",
    materials: {
      cotton: 50,
      wool: 50,
    },
  },
  {
    _id: "3",
    name: "Yarn 1",
    color: "Red",
    colorTag: "Red",
    image: yarnImageUrl,
    company: "Company 1",
    materials: {
      cotton: 50,
      wool: 50,
    },
  },
];
