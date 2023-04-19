def print_upper_words(words,starting_letters):
    """For a list of words, print each word"""
    for word in words:
        if word[0].upper() in starting_letters or word[0].lower() in starting_letters:
            print(word.upper())
