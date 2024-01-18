import { defineStore } from "pinia"
export const useAuthUserStore = defineStore("AuthUserStore", {
    state: () => {
        //Aquí ho faríem amb un action, però per resumir ho fem                                                                hardcoded
        return {
            username: "Paula",
        }
    }
})
