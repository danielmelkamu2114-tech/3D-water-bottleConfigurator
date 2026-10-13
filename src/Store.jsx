import { proxy } from "valtio";

const state  = proxy({
    intro: true,
    bottleColor:'#ffffff',
    logoTexture: "/logo1.png",

})
export {state}