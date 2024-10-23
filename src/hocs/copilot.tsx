import { type FunctionComponent, type ComponentType } from 'react';
import { TourGuideProvider, useTourGuide } from '../contexts/TourGuideProvider';
import { type TourGuideOptions } from '../types';

const ComponentWithTourGuideContext = (WrappedComponent: ComponentType) => {
  const Component: FunctionComponent<any> = (props) => {
    const TourGuide = useTourGuide();
    return <WrappedComponent {...props} {...TourGuide} />;
  };

  Component.displayName = `TourGuideInjector(${
    WrappedComponent.displayName ?? WrappedComponent.name ?? 'Component'
  })`;

  return Component;
};

/**
 * @deprecated The HOC is deprecated. Please use `TourGuideProvider` instead.
 */
export function TourGuide<P = any>(options: TourGuideOptions) {
  return (WrappedComponent: ComponentType) => {
    const OuterComponent: FunctionComponent<P> = (props) => {
      const InnerComponentWithTourGuideContext =
        ComponentWithTourGuideContext(WrappedComponent);

      return (
        <TourGuideProvider {...options}>
          <InnerComponentWithTourGuideContext {...props} />
        </TourGuideProvider>
      );
    };

    OuterComponent.displayName = `TourGuide(${
      WrappedComponent.displayName ?? WrappedComponent.name ?? 'Component'
    })`;

    return OuterComponent;
  };
}
