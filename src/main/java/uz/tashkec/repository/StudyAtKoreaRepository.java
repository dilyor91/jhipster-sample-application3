package uz.tashkec.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import uz.tashkec.domain.StudyAtKorea;

/**
 * Spring Data JPA repository for the StudyAtKorea entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StudyAtKoreaRepository extends JpaRepository<StudyAtKorea, Long> {}
