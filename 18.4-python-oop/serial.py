"""Python serial number generator."""

class SerialGenerator:
    """Machine to create unique incrementing serial numbers.
    
    >>> serial = SerialGenerator(start=100)

    >>> serial.generate()
    100

    >>> serial.generate()
    101

    >>> serial.generate()
    102

    >>> serial.reset()

    >>> serial.generate()
    100
    """
    def __init__(self, start):
        """Initialize instance with serial number and store starting number in memory"""
        self.serial_number = start-1
        self.starting_number = start-1
    
    def generate(self):
        """Add 1 to the serial number"""
        self.serial_number += 1
        return self.serial_number
    
    def reset(self):
        """Set the serial number equal to the starting number"""
        self.serial_number = self.starting_number

    def __repr__(self):
        return f"<SerialGenerator current serial = {self.serial_number}, start = {self.starting_number+1}"