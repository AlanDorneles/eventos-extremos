import React, { ReactNode } from 'react';
import { HourScopeProvider } from "./hourAnimation.jsx";
import { RadarIsCheckedProvider } from "./radarIsChecked.jsx";
import { PreviousAndNextImageProvider } from "./previousAndNextImage.jsx";
import { StationsVisibleProvider } from "./radarFilter.jsx";
import { CodeStationsProvider } from "./codeStation.jsx";
import { FilterTypeRadarProvider } from "./typeRadar.jsx";
import { RadarOrSateliteProvider } from './RadarOrSatelite.jsx';
import { PhenomenaProvider } from './Phenomena.jsx';

interface CombinedProvidersProps {
  children: ReactNode;
}

export function CombinedProviders({ children }: CombinedProvidersProps) {
  return (
    <HourScopeProvider>
      <RadarIsCheckedProvider>
        <PreviousAndNextImageProvider>
          <StationsVisibleProvider>
            <CodeStationsProvider>
              <FilterTypeRadarProvider>
                <PhenomenaProvider>
                  <RadarOrSateliteProvider>
                    {children}
                  </RadarOrSateliteProvider>
                </PhenomenaProvider>
              </FilterTypeRadarProvider>
            </CodeStationsProvider>
          </StationsVisibleProvider>
        </PreviousAndNextImageProvider>
      </RadarIsCheckedProvider>
    </HourScopeProvider>
  );
}
