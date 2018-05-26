import React, { Component } from "react";
import classnames from "classnames";
import Icon from "../icon/icon";
import css from "./header.css";

export default class Header extends Component {
    render() {
        const activeLinkClassName = classnames(css.navLink, css.active);
        return (
            <section className={css.header}>
                <div className={css.logoCont}>
                    <aside className={css.beta}>
                        <small>beta</small>
                    </aside>

                    <h1 className={css.logo}>
                        Fontcards
                        <span className={css.aligner}>&thinsp;</span>
                    </h1>
                </div>

                <nav className={css.nav}>
                    <div>
                        <a className={activeLinkClassName} href="#random">
                            Random Feed
                        </a>
                        <a className={css.navLink} href="#random">
                            Favorites
                        </a>
                    </div>

                    <div className={css.utility}>
                        <button className={css.btnIcon} type="button">
                            <Icon name="about" />
                        </button>

                        <button className={css.btnIcon} type="button">
                            <Icon name="settings" />
                        </button>
                    </div>
                </nav>
            </section>
        );
    }
}
