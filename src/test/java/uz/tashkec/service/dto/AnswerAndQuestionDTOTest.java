package uz.tashkec.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import uz.tashkec.web.rest.TestUtil;

class AnswerAndQuestionDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(AnswerAndQuestionDTO.class);
        AnswerAndQuestionDTO answerAndQuestionDTO1 = new AnswerAndQuestionDTO();
        answerAndQuestionDTO1.setId(1L);
        AnswerAndQuestionDTO answerAndQuestionDTO2 = new AnswerAndQuestionDTO();
        assertThat(answerAndQuestionDTO1).isNotEqualTo(answerAndQuestionDTO2);
        answerAndQuestionDTO2.setId(answerAndQuestionDTO1.getId());
        assertThat(answerAndQuestionDTO1).isEqualTo(answerAndQuestionDTO2);
        answerAndQuestionDTO2.setId(2L);
        assertThat(answerAndQuestionDTO1).isNotEqualTo(answerAndQuestionDTO2);
        answerAndQuestionDTO1.setId(null);
        assertThat(answerAndQuestionDTO1).isNotEqualTo(answerAndQuestionDTO2);
    }
}
