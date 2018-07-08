import React, { PureComponent } from "react";
import classnames from "classnames";
// import PropTypes from "proptypes";
import css from "./card.css";
import Icon from "../icon/icon";
import { Machine } from "xstate";
import WebfontLoader from "webfontloader";
import { card } from "./state";
import get from "lodash/get";

const sp = fn => event => {
    event.stopPropagation();
    return fn(event);
};

const Front = ({ props }) => {
    const { content, pair, loaded } = props;

    const primary = {
        fontFamily: loaded ? pair.primary.family : "BLOKK"
    };

    const secondary = {
        fontFamily: loaded ? pair.secondary.family : "BLOKK"
    };

    return (
        <div className={css.front}>
            <section className={css.frontCont}>
                <h3 style={primary} className={css.slug}>
                    {content.slug}
                </h3>
                <h1 style={primary} className={css.header}>
                    {content.header}
                </h1>
                <p style={secondary} className={css.body}>
                    {content.body}
                </p>
            </section>
        </div>
    );
};

const Rear = ({ props }) => {
    const handleFavClick = event => {
        event.stopPropagation();
        props.transition("CLICK_FAVORITE");
    };
    return (
        <div className={css.rear}>
            <section className={css.rearCont}>
                <section>
                    <h1 className={css.title}>Fonts</h1>
                    <dl className={css.fonts}>
                        <dt className={css.label}>Primary</dt>
                        <dd className={css.fontsDef}>
                            <a
                                target="_blank"
                                rel="noreferrer"
                                href={props.pair.primary.URI}
                            >
                                {props.pair.primary.family}
                            </a>
                        </dd>

                        <dt className={css.label}>Secondary</dt>
                        <dd className={css.fontsDef}>
                            <a
                                target="_blank"
                                rel="noreferrer"
                                href={props.pair.secondary.URI}
                            >
                                {props.pair.secondary.family}
                            </a>
                        </dd>
                    </dl>
                </section>

                <section>
                    <h1 className={css.title}>Content</h1>
                    <dl className={css.content}>
                        <div className={css.contentBlock}>
                            <dt className={css.label}>Source</dt>
                            <dd className={css.contentDef}>
                                {props.content.source}
                            </dd>
                        </div>
                        <div className={css.contentBlock}>
                            <dt className={css.label}>Author</dt>
                            <dd className={css.contentDef}>
                                <a
                                    target="_blank"
                                    rel="noreferrer"
                                    href={props.content.URI}
                                >
                                    {props.content.author}
                                </a>
                            </dd>
                        </div>
                    </dl>
                </section>
                <div className={css.actions}>
                    <button className={css.btn} type="button">
                        Details
                    </button>
                    <button className={css.btnFav} onClick={handleFavClick}>
                        <Icon
                            className={css.iconFav}
                            name={
                                props.favorited ? "favorited" : "notFavorited"
                            }
                        />
                    </button>
                </div>
            </section>
        </div>
    );
};

class Card extends PureComponent {
    constructor(props) {
        super(props);
        this.fontsToLoad = 2;
        this.machine = Machine(card);
        this.state = {
            current: this.machine.initialState.value
        };
        this.transition = (...actionAndEvent) => {
            const next = this.machine.transition(
                this.state.current,
                ...actionAndEvent
            ).value;
            return this.setState({
                current: next
            });
        };
    }

    componentWillMount() {
        const that = this;
        WebfontLoader.load({
            google: {
                families: [
                    this.props.pair.primary.family,
                    this.props.pair.secondary.family
                ]
            },
            // loading: function() {
            //     console.debug("loading");
            // },
            // active: function() {
            //     console.debug("active");
            // },
            // inactive: function() {
            //     console.debug("inactive");
            // },
            // fontloading: function(familyName, fvd) {
            //     console.debug("fontloading", familyName, fvd);
            // },
            fontactive(familyName, fvd) {
                // console.debug("fontactive", familyName, fvd);

                if (!--that.fontsToLoad) {
                    that.transition("FONTS_LOADED");
                }
            },
            fontinactive(familyName, fvd) {
                // if (!--that.fontsToLoad) {
                //     that.setState({
                //         // loaded: true,
                //         id:
                //             that.props.pair.primary.family +
                //             " : " +
                //             that.props.pair.secondary.family
                //     });
                // }
            }
        });
    }

    render() {
        const { props } = this;
        const cardClassName = classnames(css.card, {
            [css.active]: get(this.state, "current.idle.side") === "back"
        });
        const isFavorite = get(this.state, "current.idle.favorite") === "true";

        return (
            <article
                onClick={() => {
                    this.transition("CLICK_CARD");
                }}
                className={cardClassName}
            >
                <div className={css.cont}>
                    <Front
                        className={css.front}
                        props={{ ...props, loaded: this.state.current.idle }}
                    />
                    <Rear
                        className={css.rear}
                        props={{
                            ...props,
                            favorited: isFavorite,
                            transition: this.transition
                        }}
                    />
                </div>
            </article>
        );
    }
}

export default Card;
