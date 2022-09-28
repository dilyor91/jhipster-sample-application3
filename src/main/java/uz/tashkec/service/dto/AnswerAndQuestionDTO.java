package uz.tashkec.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link uz.tashkec.domain.AnswerAndQuestion} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class AnswerAndQuestionDTO implements Serializable {

    private Long id;

    private String questionUz;

    private String questionRu;

    private String questionKr;

    private String answerUz;

    private String answerRu;

    private String answerKr;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getQuestionUz() {
        return questionUz;
    }

    public void setQuestionUz(String questionUz) {
        this.questionUz = questionUz;
    }

    public String getQuestionRu() {
        return questionRu;
    }

    public void setQuestionRu(String questionRu) {
        this.questionRu = questionRu;
    }

    public String getQuestionKr() {
        return questionKr;
    }

    public void setQuestionKr(String questionKr) {
        this.questionKr = questionKr;
    }

    public String getAnswerUz() {
        return answerUz;
    }

    public void setAnswerUz(String answerUz) {
        this.answerUz = answerUz;
    }

    public String getAnswerRu() {
        return answerRu;
    }

    public void setAnswerRu(String answerRu) {
        this.answerRu = answerRu;
    }

    public String getAnswerKr() {
        return answerKr;
    }

    public void setAnswerKr(String answerKr) {
        this.answerKr = answerKr;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof AnswerAndQuestionDTO)) {
            return false;
        }

        AnswerAndQuestionDTO answerAndQuestionDTO = (AnswerAndQuestionDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, answerAndQuestionDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "AnswerAndQuestionDTO{" +
            "id=" + getId() +
            ", questionUz='" + getQuestionUz() + "'" +
            ", questionRu='" + getQuestionRu() + "'" +
            ", questionKr='" + getQuestionKr() + "'" +
            ", answerUz='" + getAnswerUz() + "'" +
            ", answerRu='" + getAnswerRu() + "'" +
            ", answerKr='" + getAnswerKr() + "'" +
            "}";
    }
}
