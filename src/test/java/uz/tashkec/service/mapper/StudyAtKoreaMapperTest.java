package uz.tashkec.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class StudyAtKoreaMapperTest {

    private StudyAtKoreaMapper studyAtKoreaMapper;

    @BeforeEach
    public void setUp() {
        studyAtKoreaMapper = new StudyAtKoreaMapperImpl();
    }
}
