export const card = {
    key: "Card",
    initial: "loading",
    states: {
        idle: {
            parallel: true,
            states: {
                favorite: {
                    initial: "false",
                    states: {
                        true: {
                            on: {
                                CLICK_FAVORITE: "false"
                            }
                        },
                        false: {
                            on: {
                                CLICK_FAVORITE: "true"
                            }
                        }
                    }
                },
                side: {
                    initial: "front",
                    states: {
                        front: {
                            on: {
                                CLICK_CARD: "back"
                            }
                        },
                        back: {
                            // onEntry: ["resetOtherCards"],
                            on: {
                                CLICK_CARD: "front"
                                // RESET_OTHER_CARDS: "front"
                            }
                        }
                    }
                }
            }
        },
        loading: {
            onEntry: ["loadBothFonts"],
            on: {
                FONTS_LOADED: "idle"
            }
        }
    }
};

export const feed = {
    key: "Feed",
    initial: "loading",
    states: {
        idle: {
            on: {
                NEXT_PAGE: "loading"
            }
        },
        loading: {
            onEntry: ["fetchFeed"],
            on: {
                FETCH_FEED_SUCCESS: "idle"
            }
        }
    }
};

export const popup = {
    initial: "hidden",
    states: {
        hidden: {
            on: {
                SHOW_SETTINGS_POPUP: "settings",
                SHOW_ABOUT_POPUP: "about"
            }
        },
        about: {
            on: {
                HIDE_ABOUT_POPUP: "hidden"
            }
        },
        settings: {
            on: {
                HIDE_SETTINGS_POPUP: "hidden"
            }
        }
    }
};

export const routes = {
    404: "notFound",
    500: "crash",
    RANDOM: "random",
    FAVORITED: "favorited"
};

export const app = {
    key: "App",
    initial: "start",
    states: {
        idle: {
            initial: "random",
            on: {
                500: "crash",
                404: "notFound",
                RANDOM: "idle.random",
                FAVORITED: "idle.favorited"
            },
            states: {
                random: {
                    parallel: true,
                    states: {
                        feed,
                        popup
                    }
                },
                favorited: {
                    parallel: true,
                    states: {
                        feed,
                        popup
                    }
                }
            }
        },
        loading: {
            on: {
                LOADED: "idle"
            }
        },
        start: {
            onEntry: "INIT",
            on: {
                INIT: "loading",
                ERROR: "crash"
            }
        },
        notFound: {
            onEntry: ["SHOW_NOT_FOUND"]
        },
        crash: {
            onEntry: ["SEND_CRASH_REPORT"],
            on: {
                SEND_CRASH_REPORT: "start"
            }
        }
    }
};
