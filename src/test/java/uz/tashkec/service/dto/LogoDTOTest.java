package uz.tashkec.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import uz.tashkec.web.rest.TestUtil;

class LogoDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(LogoDTO.class);
        LogoDTO logoDTO1 = new LogoDTO();
        logoDTO1.setId(1L);
        LogoDTO logoDTO2 = new LogoDTO();
        assertThat(logoDTO1).isNotEqualTo(logoDTO2);
        logoDTO2.setId(logoDTO1.getId());
        assertThat(logoDTO1).isEqualTo(logoDTO2);
        logoDTO2.setId(2L);
        assertThat(logoDTO1).isNotEqualTo(logoDTO2);
        logoDTO1.setId(null);
        assertThat(logoDTO1).isNotEqualTo(logoDTO2);
    }
}
