// import { useEffect, useState } from "react";

// export default function useFilePreview(file:any) {
//     const [imgSrc, setImgSrc] = useState<string | null>(null);

//     useEffect(() => {
//         if (file && file[0]) {
//             const newUrl = URL.createObjectURL(file[0]);

//             if (newUrl !== imgSrc) {
//                 setImgSrc(newUrl);
//             }
//         }
//     }, [file]);

//     return [imgSrc, setImgSrc];
// }