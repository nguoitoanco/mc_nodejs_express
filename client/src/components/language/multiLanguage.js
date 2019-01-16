import {LanguageState} from './languageState';
import {Pivot, PivotItem} from 'office-ui-fabric-react';
import React, {Component} from 'react';

export const LANGUAGE = {
    ENGLISH: 0,
    JAPANESE: 1
};
export interface MultilanguageProps { compiler: string; framework: string}
// 'MultilanguageProps' describes the shape of props.
// State is never set so we use the 'undefined' type.
export class MultiLanguage extends Component<MultilanguageProps, LanguageState> {

    constructor(props: MultilanguageProps, state: LanguageState) {
        super(props);

        this.state = {
            status: '',
            currentLanguage: LANGUAGE.ENGLISH,
        };

        //this._getErrorMessage = this._getErrorMessage.bind(this);
    }

    async componentWillMount() {
        console.log("componentWillMount!!");
        // get favorite language
        let favoriteLanguage = 'en'; //this.getUrlQueryString('SPLanguage');
        if (favoriteLanguage.search(/en/i) > -1) {
            this.setState({
                currentLanguage: LANGUAGE.ENGLISH
            });
        } else {
            this.setState({
                currentLanguage: LANGUAGE.JAPANESE
            });
        }
    }

    render() {
        return (
            <div>
                <Pivot onLinkClick={ this.onLinkClick.bind(this) }>
                    <PivotItem linkText='ENGLISH' itemIcon='TextBox' itemKey='en' aria-selected="false">
                    </PivotItem>
                    <PivotItem linkText='日本語' itemIcon='TextBox' itemKey='jp' aria-selected="true">
                    </PivotItem>
                </Pivot>
            </div>
        );
    }

    onLinkClick(item: PivotItem): void {
        console.log(item.props.linkText);
        let languageSelected = LANGUAGE.ENGLISH;
        switch (item.props.itemKey) {
            case "jp":
                languageSelected = LANGUAGE.JAPANESE;
                break;
        }
        this.setState({
            currentLanguage: languageSelected
        });

        localStorage.setItem('mc.node.js.express.language', languageSelected);
        this.props.onClick(languageSelected);
    }
}