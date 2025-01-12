import React from 'react';
import BottomSheet from '@gorhom/bottom-sheet';

export default function BottomSheetComp({
  innerRef,
  children,
  ...otherProps
}: any) {
  return (
    <BottomSheet ref={innerRef} {...otherProps}>
      {children}
    </BottomSheet>
  );
}
