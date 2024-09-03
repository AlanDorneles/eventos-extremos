import React, { ReactNode } from "react";
import { HourScopeProvider } from "./hourAnimation.jsx";
import { RadarIsCheckedProvider } from "./radarIsChecked.jsx";
import { PreviousAndNextImageProvider } from "./previousAndNextImage.jsx";
import { StationsVisibleProvider } from "./radarFilter.jsx";
import { CodeStationsProvider } from "./codeStation.jsx";
import { FilterTypeRadarProvider } from "./typeRadar.jsx";
import { RadarOrSateliteProvider } from './RadarOrSatelite.jsx';
import { ButtonSatProvider } from './buttonSat.jsx';
import { PhenomenaProvider } from "./Phenomena.jsx";
import { ShowMenuConfigurationProvider } from "./showMenu.jsx";
import { CheckedsProvider } from "./Checkeds.jsx";
import { ImageProvider } from "./satImageUpdate.jsx";


interface CombinedProvidersProps {
  children: ReactNode;
}

export function CombinedProviders({ children }: CombinedProvidersProps) {
  return (
    <HourScopeProvider>
      <CheckedsProvider>
      <ImageProvider>
        <ShowMenuConfigurationProvider>
          <ButtonSatProvider>
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
          </ButtonSatProvider>
        </ShowMenuConfigurationProvider>
      </ImageProvider>
      </CheckedsProvider>
    </HourScopeProvider>
  );
}
