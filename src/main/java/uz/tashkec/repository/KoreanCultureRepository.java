package uz.tashkec.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import uz.tashkec.domain.KoreanCulture;

/**
 * Spring Data JPA repository for the KoreanCulture entity.
 */
@SuppressWarnings("unused")
@Repository
public interface KoreanCultureRepository extends JpaRepository<KoreanCulture, Long> {}
