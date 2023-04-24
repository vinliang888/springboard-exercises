def same_frequency(num1, num2):
    """Do these nums have same frequencies of digits?
    
        >>> same_frequency(551122, 221515)
        True
        
        >>> same_frequency(321142, 3212215)
        False
        
        >>> same_frequency(1212, 2211)
        True
    """
    list1 = list(str(num1))
    list2 = list(str(num2))
    dict1 = {digit: list1.count(digit) for digit in list1}
    dict2 = {digit: list2.count(digit) for digit in list2}
    return dict1 == dict2