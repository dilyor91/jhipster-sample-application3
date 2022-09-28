package uz.tashkec.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class AnswerAndQuestionMapperTest {

    private AnswerAndQuestionMapper answerAndQuestionMapper;

    @BeforeEach
    public void setUp() {
        answerAndQuestionMapper = new AnswerAndQuestionMapperImpl();
    }
}
