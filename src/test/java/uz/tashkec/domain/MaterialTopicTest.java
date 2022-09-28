package uz.tashkec.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import uz.tashkec.web.rest.TestUtil;

class MaterialTopicTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MaterialTopic.class);
        MaterialTopic materialTopic1 = new MaterialTopic();
        materialTopic1.setId(1L);
        MaterialTopic materialTopic2 = new MaterialTopic();
        materialTopic2.setId(materialTopic1.getId());
        assertThat(materialTopic1).isEqualTo(materialTopic2);
        materialTopic2.setId(2L);
        assertThat(materialTopic1).isNotEqualTo(materialTopic2);
        materialTopic1.setId(null);
        assertThat(materialTopic1).isNotEqualTo(materialTopic2);
    }
}
