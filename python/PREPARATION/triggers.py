def try_validation_trigger(container, movie):
    response = container.create_item(
        movie, {"pre_trigger_include": "validateMovieDate"}
    )
    return response


def run_validation_trigger(container, movie):
    response = container.create_item(movie, pre_trigger_include="validateMovieDate")
    return response


def run_interception_trigger(container, movie):
    response = container.create_item(movie, pre_trigger_include="interceptMovieDate")
    return response


def run_stats_trigger(container, movie):
    response = container.create_item(
        movie, post_trigger_include="updateMovieGenreStats"
    )
    return response


def run_count_trigger(container, movie):
    response = container.create_item(
        movie, post_trigger_include="countMovieInGenre")
    return response


def run_validation_then_stats_trigger(container, movie):
    response = container.create_item(
        movie,
        pre_trigger_include="validateMovieDate",
        post_trigger_include="updateMovieGenreStats",
    )
    return response


def run_validation_then_count_trigger(container, movie):
    response = container.create_item(
        movie,
        pre_trigger_include="validateMovieDate",
        post_trigger_include="countMovieInGenre",
    )
    return response


def run_inteception_then_stats_trigger(container, movie):
    response = container.create_item(
        movie,
        pre_trigger_include="interceptMovieDate",
        post_trigger_include="updateMovieGenreStats",
    )
    return response


def run_inteception_then_count_trigger(container, movie):
    response = container.create_item(
        movie,
        pre_trigger_include="interceptMovieDate",
        post_trigger_include="countMovieInGenre",
    )
    return response


def run_inteception_then_stats_trigger(container, movie):
    response = container.create_item(
        movie,
        pre_trigger_include="interceptMovieDate",
        post_trigger_include="updateMovieGenreStats",
    )
    return response


"""having a generic post and pre trigger functions
    this can result in the actual names of the triggers being stored elsewhere.
    or even have certain triggers run for different datasets
"""


def run_generic_pre_trigger(container, movie, pre_trigger):
    response = container.create_item(movie, post_trigger_include=pre_trigger)
    return response


def run_generic_post_trigger(container, movie, post_trigger):
    response = container.create_item(movie, post_trigger_include=post_trigger)
    return reponse


def run_generic_pre_then_post_trigger(container, movie, pre_trigger, post_trigger):
    response = container.create_item(
        movie,
        pre_trigger_include=pre_trigger,
        post_trigger_include=post_trigger,
    )
    return response
