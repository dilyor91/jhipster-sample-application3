package uz.tashkec.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import uz.tashkec.web.rest.TestUtil;

class GreetingDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(GreetingDTO.class);
        GreetingDTO greetingDTO1 = new GreetingDTO();
        greetingDTO1.setId(1L);
        GreetingDTO greetingDTO2 = new GreetingDTO();
        assertThat(greetingDTO1).isNotEqualTo(greetingDTO2);
        greetingDTO2.setId(greetingDTO1.getId());
        assertThat(greetingDTO1).isEqualTo(greetingDTO2);
        greetingDTO2.setId(2L);
        assertThat(greetingDTO1).isNotEqualTo(greetingDTO2);
        greetingDTO1.setId(null);
        assertThat(greetingDTO1).isNotEqualTo(greetingDTO2);
    }
}
