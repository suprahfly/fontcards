import React from "react";
import classnames from "classnames";
// import PropTypes from "proptypes";
import css from "./card.css";

const Front = ({ props: content }) => (
    <div className={css.front}>
        <section className={css.frontCont}>
            <h3 className={css.slug}>{content.slug}</h3>
            <h1 className={css.header}>{content.header}</h1>
            <p className={css.body}>{content.body}</p>
        </section>
    </div>
);

const Rear = ({ props }) => (
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
                {/* <button></button> */}
            </div>
        </section>
    </div>
);

const Card = props => {
    const cardClassName = classnames(css.card, props.isActive && css.active);
    return (
        <article click={props.setActive} className={css.card}>
            <div className={css.cont}>
                <Front className={css.front} props={props.content} />
                <Rear className={css.rear} props={props} />
            </div>
        </article>
    );
};

export default Card;
