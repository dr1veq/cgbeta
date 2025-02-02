import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'MainFooterWebPartStrings';
import MainFooter from './components/MainFooter';

export interface IMainFooterWebPartProps {
  description: string;
}


export interface IMainFooterProps {
  items: {
    logoIcon: string;
    logoLinkUrl: string;
    socialLinks: { url: string; icon: string; }[];
  }[];
}

export default class MainFooterWebPart extends BaseClientSideWebPart<IMainFooterProps> {

  public render(): void {
    const element: React.ReactElement<IMainFooterProps> = React.createElement(
      MainFooter,
      {
        items: [
          {
            logoIcon: require('./assets/images/centralgroup.png'),
            logoLinkUrl: 'https://centrlalgrp.com',
            socialLinks: [
              {  icon: require('./assets/images/linkedin-icon.png'),  url: 'https://www.linkedin.com/company/the-central-group/' }
            ]
            
          },
          {
            logoIcon: require('./assets/images/pti.png'),
            logoLinkUrl: ' https://PTIbox.com',
            socialLinks: [
              { icon: require('./assets/images/linkedin-icon.png'), url: 'https://www.linkedin.com/company/packaging-technologies-inc-/' }
            ]
            
          },
          {
            logoIcon: require('./assets/images/independent.png'),
            logoLinkUrl: ' https://corrugated-sheets.com/',
            socialLinks: [
              { icon: require('./assets/images/linkedin-icon.png'), url: 'https://www.linkedin.com/company/independent-corrugator-inc-/' }
            ]
            
          },
          {
            logoIcon: require('./assets/images/centralpac.png'),
            logoLinkUrl: 'https://www.centralpac.com/',
            socialLinks: [
              { icon: require('./assets/images/linkedin-icon.png') , url: 'https://www.linkedin.com/company/thecentralpac/'},
              { icon: require('./assets/images/instagram-icon.png'), url:'https://www.instagram.com/thecentralpac/' }
              
            ]
            
          },
          {
            logoIcon: require('./assets/images/ecoshop.png'),
            logoLinkUrl: 'https://ecoshop.centralgrp.com/',
            socialLinks: [
               { icon : require('./assets/images/linkedin-icon.png'), url: 'https://www.linkedin.com/showcase/tcg-ecoshop/' }
            ]
            
          }
        ]
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onInit(): Promise<void> {
    return this._getEnvironmentMessage().then(message => {
    });
  }



  private _getEnvironmentMessage(): Promise<string> {
    if (!!this.context.sdks.microsoftTeams) { // running in Teams, office.com or Outlook
      return this.context.sdks.microsoftTeams.teamsJs.app.getContext()
        .then(context => {
          let environmentMessage: string = '';
          switch (context.app.host.name) {
            case 'Office': // running in Office
              environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentOffice : strings.AppOfficeEnvironment;
              break;
            case 'Outlook': // running in Outlook
              environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentOutlook : strings.AppOutlookEnvironment;
              break;
            case 'Teams': // running in Teams
            case 'TeamsModern':
              environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentTeams : strings.AppTeamsTabEnvironment;
              break;
            default:
              environmentMessage = strings.UnknownEnvironment;
          }

          return environmentMessage;
        });
    }

    return Promise.resolve(this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentSharePoint : strings.AppSharePointEnvironment);
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    const {
      semanticColors
    } = currentTheme;

    if (semanticColors) {
      this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || null);
      this.domElement.style.setProperty('--link', semanticColors.link || null);
      this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered || null);
    }

  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
