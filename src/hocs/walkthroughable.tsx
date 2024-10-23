import React, { type FunctionComponent } from 'react';
import { type NativeMethods } from 'react-native/types';

interface TourGuideType {
  ref?: React.RefObject<NativeMethods>;
  onLayout?: () => void;
}

export function walkthroughable<P = any>(
  WrappedComponent: React.ComponentType<P>
) {
  const Component: FunctionComponent<P> = (props: P) => {
    const { TourGuide, ...rest } = props as { TourGuide: TourGuideType } & P;
    return <WrappedComponent {...TourGuide} {...(rest as any)} />;
  };

  Component.displayName = 'Walkthroughable';

  return Component;
}
