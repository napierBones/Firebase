import { create } from 'zustand';

interface StoreState {
  isPopupAddCheckinVisible: boolean;
  togglePopupAddCheckin: () => void;
}

const useStore = create<StoreState>((set) => ({
  isPopupAddCheckinVisible: false,
  togglePopupAddCheckin: () =>
    set((state) => ({
      isPopupAddCheckinVisible: !state.isPopupAddCheckinVisible,
    })), //
}));

export default useStore;
