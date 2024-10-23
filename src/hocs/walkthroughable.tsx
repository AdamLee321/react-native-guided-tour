import React, { type FunctionComponent } from 'react';
import { type NativeMethods } from 'react-native/types';

interface TourGuideProps {
  ref?: React.RefObject<NativeMethods>;
  onLayout?: () => void;
}

export function walkthroughable<P extends object>(
  WrappedComponent: React.ComponentType<P & TourGuideProps>
): FunctionComponent<Omit<P, keyof TourGuideProps>> {
  const Component: FunctionComponent<Omit<P, keyof TourGuideProps>> = (
    props
  ) => {
    const { ...rest } = props;

    return <WrappedComponent {...(rest as P)} />;
  };

  Component.displayName = 'Walkthroughable';

  return Component;
}
