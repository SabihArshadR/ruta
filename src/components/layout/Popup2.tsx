"use client";
import { FiArrowLeft } from "react-icons/fi";
import Image from "next/image";
import { useTranslations } from "next-intl";

import pic1 from "../../../public/link/1.svg";
import pic2 from "../../../public/link/2.svg";
import pic3 from "../../../public/link/3.svg";
import pic4 from "../../../public/link/4.svg";
import pic5 from "@/assets/Som Experiènciesnew.png";

const images = [
  { id: 27, image: pic1, link: 1 },
  { id: 28, image: pic2, link: 2 },
  { id: 29, image: pic3, link: 3 },
  { id: 30, image: pic4, link: 4 },
  { id: 31, image: pic5, link: 5 },
];

const SplashPopUp2 = ({ handleClose }: { handleClose: () => void }) => {
  const t = useTranslations("Dashboard");
  const t2 = useTranslations("Link");

  return (
    <div className="fixed inset-0 p-2 flex items-center justify-center bg-black/50 z-50">
      <div className="relative w-full max-w-md bg-[#F5EFE3] rounded-2xl shadow-2xl p-3 overflow-y-scroll max-h-[85vh]">
        <div className="flex  gap-3 p-4 ">
          <button onClick={handleClose} className="p-1">
            <FiArrowLeft size={24} />
          </button>
        </div>

        <div className="">
          <h2 className="text-[20px] text-backblack font-bold mb-6 text-center">{t("knowtitle")}</h2>
          <div className="space-y-4">
            {images.map(({ id, image, link }) => (
              <div
                key={id}
                className="rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 flex items-center"
              >
                <div className="w-[128px] h-[128px] bg-white rounded-lg flex-shrink-0 flex items-center justify-center mr-4">
                  <Image
                    src={image}
                    alt={`Logo ${id}`}
                    width={100}
                    height={100}
                    className="object-cover"
                  />
                </div>
                <div className="flex-grow">
                  <p className="text-[20px] text-backblack font-medium">
                    {t(`pic${id}`)}
                  </p>
                  {/* <a
                    href={t2(`link${link}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#AD3F37] hover:underline block mb-2"
                  >
                    {t2(`link${link}`)}
                  </a> */}
                  <a
                    href={t2(`link${link}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#AD3F37] hover:underline italic mb-2"
                  >
                    {t2("title")}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashPopUp2;
