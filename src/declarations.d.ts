declare module "*.module.scss";

declare module '*.scss' {
  const content: {
    [className: string]: string; 
    breakpointMobile: string; 
    breakpointTablet: string;
    primaryColor: string; 
    whiteColor: string;
  };
  export default content;
}
