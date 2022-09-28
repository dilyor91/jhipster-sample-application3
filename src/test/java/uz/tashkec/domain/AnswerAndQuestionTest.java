package uz.tashkec.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import uz.tashkec.web.rest.TestUtil;

class AnswerAndQuestionTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AnswerAndQuestion.class);
        AnswerAndQuestion answerAndQuestion1 = new AnswerAndQuestion();
        answerAndQuestion1.setId(1L);
        AnswerAndQuestion answerAndQuestion2 = new AnswerAndQuestion();
        answerAndQuestion2.setId(answerAndQuestion1.getId());
        assertThat(answerAndQuestion1).isEqualTo(answerAndQuestion2);
        answerAndQuestion2.setId(2L);
        assertThat(answerAndQuestion1).isNotEqualTo(answerAndQuestion2);
        answerAndQuestion1.setId(null);
        assertThat(answerAndQuestion1).isNotEqualTo(answerAndQuestion2);
    }
}
