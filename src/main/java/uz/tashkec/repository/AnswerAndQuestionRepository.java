package uz.tashkec.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import uz.tashkec.domain.AnswerAndQuestion;

/**
 * Spring Data JPA repository for the AnswerAndQuestion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AnswerAndQuestionRepository extends JpaRepository<AnswerAndQuestion, Long> {}
