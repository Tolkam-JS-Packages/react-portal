import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { PureComponent } from 'react';

export default class Portal extends PureComponent<IProps> {

    /**
     * Children wrapper element
     */
    protected element: HTMLElement;

    /**
     * @param {IProps} props
     */
    public constructor(props: IProps) {
        super(props);
        this.element = this.props.element || document.createElement('div');
    }

    /**
     * @inheritdoc
     */
    public componentDidMount() {
        this.props.to.appendChild(this.element);
    }

    /**
     * @inheritdoc
     */
    public componentWillUnmount() {
        this.props.to.removeChild(this.element);
    }

    /**
     * @inheritdoc
     */
    public render() {
        const that = this;

        return ReactDOM.createPortal(
            that.props.children,
            that.element,
        );
    }

    /**
     * Gets portal element
     *
     * @return HTMLElement
     */
    public getElement() {
        return this.element;
    }
}

interface IProps extends React.HTMLAttributes<Portal> {
    // parent element to append portal to
    to: HTMLElement,

    // portal contents wrapper element
    element?: HTMLElement,
}