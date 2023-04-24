def mode(nums):
    """Return most-common number in list.

    For this function, there will always be a single-most-common value;
    you do not need to worry about handling cases where more than one item
    occurs the same number of times.

        >>> mode([1, 2, 1])
        1

        >>> mode([2, 2, 3, 3, 2])
        2
    """
    dct = {num: nums.count(num) for num in nums}
    max_freq = 0
    mode = None
    for (num,freq) in dct.items():
        if freq > max_freq:
            max_freq = freq
            mode = num
    return mode


