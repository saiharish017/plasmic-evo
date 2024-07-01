import { initPlasmicLoader } from "@plasmicapp/loader-nextjs";
import { registerComponent } from '@plasmicapp/host';
import ContactForm from "@/components/ContactForm" 

export const PLASMIC = initPlasmicLoader({
  projects: [
    {
      id: "f7L9mc8Jg4AGYaNiZiiKEY",
      token: "FfAlLCd6ccr06JGhv4qcKyByaibU3oyHDnZnPRNxZTYNbx9tDKyxp2djOxS0PBW1xcQWUobwDFOBupdPcQ",
    },
  ],
 

  // By default Plasmic will use the last published version of your project.
  // For development, you can set preview to true, which will use the unpublished
  // project, allowing you to see your designs without publishing.  Please
  // only use this for development, as this is significantly slower.
  preview: true,
});
PLASMIC.registerComponent(ContactForm, {
  name: "ContactForm",
  props: {
    // Define props here if applicable (e.g., submitButtonText: 'string')
  },
  defaultStyles: {
    // Define default styles here if applicable (e.g., border: '1px solid #ccc')
  },
  
  
});

// You can register any code components that you want to use here; see
// https://docs.plasmic.app/learn/code-components-ref/
// And configure your Plasmic project to use the host url pointing at
// the /plasmic-host page of your nextjs app (for example,
// http://localhost:3000/plasmic-host).  See
// https://docs.plasmic.app/learn/app-hosting/#set-a-plasmic-project-to-use-your-app-host

// PLASMIC.registerComponent(...);
