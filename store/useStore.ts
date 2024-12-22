import { create } from 'zustand';

interface StoreState {
  isPopupAddCheckinVisible: boolean;
  isLoggedIn: string;
  togggleLoggedIn: (State:string) => void;
  togglePopupAddCheckin: () => void;
  isPopupDetailsCheckinVisible: boolean;
  PopupDetailsCheckinId: string ;
  togglePopupDetailsCheckin: (id?:string) => void;
  isPopupLoginVisible: boolean;
  togglePopupLogin: () => void;
}

const useStore = create<StoreState>((set) => ({
  isLoggedIn: 'false',
  isPopupAddCheckinVisible: false,
  isPopupDetailsCheckinVisible: false,
  PopupDetailsCheckinId: '',
  isPopupLoginVisible: false,
  togglePopupAddCheckin: () =>
    set((state) => ({
      isPopupAddCheckinVisible: !state.isPopupAddCheckinVisible,
    })),
    togglePopupDetailsCheckin: (id?: string) =>
      set((state) => ({
          isPopupDetailsCheckinVisible: !state.isPopupDetailsCheckinVisible,
          PopupDetailsCheckinId: id ?? state.PopupDetailsCheckinId, 
      })),
    togglePopupLogin: () =>
    set((state) => ({
      isPopupLoginVisible: !state.isPopupLoginVisible,
    })),
    togggleLoggedIn: (State:string) =>
    set((state) => ({
      isLoggedIn:State,
    })),
}));

export default useStore;
