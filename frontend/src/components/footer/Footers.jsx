import { Typography } from "@material-tailwind/react";
 
const LINKS = [
  {
    title: "Dịch vụ",
    items: ["Vận chuyển trong nước", "Vận chuyển nước ngoài", "Vận chuyển hỏa tốc"],
  },
  {
    title: "Công ty",
    items: ["Về chúng tôi", "Tuyển dụng", "Tin tức"],
  },
  {
    title: "Nguồn",
    items: ["Blog", "Sự kiện", "Trung tâm hỗ trợ"],
  },
];
 
const currentYear = new Date().getFullYear();
 
export function FooterWithSocialLinks() {
  return (
    <footer className="relative w-full bg-primary p-10">
      <div className="mx-auto w-full max-w-7xl px-8 text-white">
        <div className="grid grid-cols-1 justify-between gap-4 md:grid-cols-2">
          <Typography variant="h2" className="mb-6">
            Magic Post
          </Typography>
          <div className="grid grid-cols-3 justify-between gap-4 text-white">
            {LINKS.map(({ title, items }) => (
              <ul key={title}>
                <Typography
                  variant="small"
                  className="mb-3 font-medium text-secondary"
                >
                  {title}
                </Typography>
                {items.map((link) => (
                  <li key={link}>
                    <Typography
                      as="a"
                      href="#"
                      className="py-1.5 font-normal transition-colors hover:text-blue-gray-900"
                    >
                      {link}
                    </Typography>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
        <div className="mt-12 flex w-full flex-col items-center justify-center border-t border-blue-gray-50 py-4 md:flex-row md:justify-between">
          <Typography
            variant="small"
            className="mb-4 text-center font-normal text-blue-gray-900 md:mb-0"
          >
            &copy; {currentYear} <a href="https://material-tailwind.com/">Magic Post</a>. All
            Rights Reserved.
          </Typography>
          <div className="flex gap-4 text-blue-gray-900 sm:justify-center">
            <Typography as="a" href="#" className="opacity-80 transition-opacity hover:opacity-100">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">

              </svg>
            </Typography>
            <Typography as="a" href="#" className="opacity-80 transition-opacity hover:opacity-100">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                
              </svg>
            </Typography>
            <Typography as="a" href="#" className="opacity-80 transition-opacity hover:opacity-100">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </Typography>
            <Typography as="a" href="#" className="opacity-80 transition-opacity hover:opacity-100">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                
              </svg>
            </Typography>
            <Typography as="a" href="#" className="opacity-80 transition-opacity hover:opacity-100">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                
              </svg>
            </Typography>
          </div>
        </div>
      </div>
    </footer>
  );
}