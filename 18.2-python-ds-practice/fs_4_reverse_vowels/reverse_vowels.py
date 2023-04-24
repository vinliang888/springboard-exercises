def reverse_vowels(s):
    """Reverse vowels in a string.

    Characters which re not vowels do not change position in string, but all
    vowels (y is not a vowel), should reverse their order.

    >>> reverse_vowels("Hello!")
    'Holle!'

    >>> reverse_vowels("Tomatoes")
    'Temotaos'

    >>> reverse_vowels("Reverse Vowels In A String")
    'RivArsI Vewols en e Streng'

    reverse_vowels("aeiou")
    'uoiea'

    reverse_vowels("why try, shy fly?")
    'why try, shy fly?''
    """
    vowels = {'a', 'e', 'i', 'o', 'u'}
    
    last_search = len(s) - 1
    s = list(s)
    for i in range(0,len(s)):
        if s[i].lower() in vowels:
            first_vowel = s[i]
            for j in range(last_search, i,-1):
                if s[j].lower() in vowels:
                    s[i] = s[j]
                    s[j] = first_vowel
                    last_search = j-1
                    break
    return "".join(s)