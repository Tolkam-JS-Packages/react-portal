import { HTMLProps, PureComponent } from 'react';
import { createPortal } from 'react-dom';

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
        this.element = this.props.element || document.createElement('span');
        this.element.setAttribute('style', 'display:contents');
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

        return createPortal(
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

interface IProps extends HTMLProps<Portal> {
    // parent element to append portal to
    to: HTMLElement,

    // portal contents wrapper element
    element?: HTMLElement,
}
