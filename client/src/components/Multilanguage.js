import {MultilanguageState} from './MultilanguageState';
import {Pivot, PivotItem} from 'office-ui-fabric-react';
import React, {Component} from 'react';
import language from "./language";

export interface MultilanguageProps { compiler: string; framework: string}
// 'MultilanguageProps' describes the shape of props.
// State is never set so we use the 'undefined' type.
export class Multilanguage extends Component<MultilanguageProps, MultilanguageState> {

    constructor(props: MultilanguageProps, state: MultilanguageState) {
        super(props);

        this.state = {
            status: '',
            currentLanguage: 0,
        };

        //this._getErrorMessage = this._getErrorMessage.bind(this);
    }

    async componentWillMount() {
        console.log("componentWillMount!!");
        // get favorite language
        let favoriteLanguage = 'en'; //this.getUrlQueryString('SPLanguage');
        if (favoriteLanguage.search(/en/i) > -1) {
            this.setState({
                currentLanguage: 0
            });
        } else {
            this.setState({
                currentLanguage: 1
            });
        }
    }

    render() {
        return (
            <div className="text-right">
                <Pivot onLinkClick={ this.onLinkClick.bind(this) }>
                    <PivotItem linkText='ENGLISH' itemIcon='TextBox' itemKey='en'>
                    </PivotItem>
                    <PivotItem linkText='JAPANESE' itemIcon='TextBox' itemKey='jp'>
                    </PivotItem>
                </Pivot>
                {/*<h1>{t[this.state.currentLanguage].welcome} {this.props.compiler} {this.props.framework} App!</h1>*/}
                {/*<h2>{t[this.state.currentLanguage].description}</h2>*/}
            </div>
        );
    }

    onLinkClick(item: PivotItem): void {
        console.log(item.props.linkText);
        let languageSelected = 0;
        switch (item.props.itemKey) {
            case "jp":
                languageSelected = 1;
                break;
        }
        this.setState({
            currentLanguage: languageSelected
        });
        this.props.onClick(languageSelected) ;
    }
}