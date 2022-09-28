package uz.tashkec.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import uz.tashkec.web.rest.TestUtil;

class PopupDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(PopupDTO.class);
        PopupDTO popupDTO1 = new PopupDTO();
        popupDTO1.setId(1L);
        PopupDTO popupDTO2 = new PopupDTO();
        assertThat(popupDTO1).isNotEqualTo(popupDTO2);
        popupDTO2.setId(popupDTO1.getId());
        assertThat(popupDTO1).isEqualTo(popupDTO2);
        popupDTO2.setId(2L);
        assertThat(popupDTO1).isNotEqualTo(popupDTO2);
        popupDTO1.setId(null);
        assertThat(popupDTO1).isNotEqualTo(popupDTO2);
    }
}
