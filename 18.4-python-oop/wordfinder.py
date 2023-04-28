"""Word Finder: finds random words from a dictionary."""
import random

class WordFinder:
    def __init__(self, filepath):
        self.filepath = filepath
        self.generate_word_list()
        print(f"{len(self.word_list)} words read")
    
    def generate_word_list(self):
        self.word_list = []
        file = open(self.filepath)
        for line in file:
            self.word_list.append(line.strip())
        file.close()
    
    def random(self):
        return random.choice(self.word_list)


class SpecialWordFinder(WordFinder):
    def __init__(self, filepath):
        super().__init__(filepath)
        self.filter_word_list()

    def filter_word_list(self):
        self.word_list = [word for word in self.word_list if word != '' and word[0] != '#']
        print(f"{len(self.word_list)} words remaining")