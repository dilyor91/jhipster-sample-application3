package uz.tashkec.service.impl;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import uz.tashkec.domain.KoreanCulture;
import uz.tashkec.repository.KoreanCultureRepository;
import uz.tashkec.service.KoreanCultureService;
import uz.tashkec.service.dto.KoreanCultureDTO;
import uz.tashkec.service.mapper.KoreanCultureMapper;

/**
 * Service Implementation for managing {@link KoreanCulture}.
 */
@Service
@Transactional
public class KoreanCultureServiceImpl implements KoreanCultureService {

    private final Logger log = LoggerFactory.getLogger(KoreanCultureServiceImpl.class);

    private final KoreanCultureRepository koreanCultureRepository;

    private final KoreanCultureMapper koreanCultureMapper;

    public KoreanCultureServiceImpl(KoreanCultureRepository koreanCultureRepository, KoreanCultureMapper koreanCultureMapper) {
        this.koreanCultureRepository = koreanCultureRepository;
        this.koreanCultureMapper = koreanCultureMapper;
    }

    @Override
    public KoreanCultureDTO save(KoreanCultureDTO koreanCultureDTO) {
        log.debug("Request to save KoreanCulture : {}", koreanCultureDTO);
        KoreanCulture koreanCulture = koreanCultureMapper.toEntity(koreanCultureDTO);
        koreanCulture = koreanCultureRepository.save(koreanCulture);
        return koreanCultureMapper.toDto(koreanCulture);
    }

    @Override
    public KoreanCultureDTO update(KoreanCultureDTO koreanCultureDTO) {
        log.debug("Request to update KoreanCulture : {}", koreanCultureDTO);
        KoreanCulture koreanCulture = koreanCultureMapper.toEntity(koreanCultureDTO);
        koreanCulture = koreanCultureRepository.save(koreanCulture);
        return koreanCultureMapper.toDto(koreanCulture);
    }

    @Override
    public Optional<KoreanCultureDTO> partialUpdate(KoreanCultureDTO koreanCultureDTO) {
        log.debug("Request to partially update KoreanCulture : {}", koreanCultureDTO);

        return koreanCultureRepository
            .findById(koreanCultureDTO.getId())
            .map(existingKoreanCulture -> {
                koreanCultureMapper.partialUpdate(existingKoreanCulture, koreanCultureDTO);

                return existingKoreanCulture;
            })
            .map(koreanCultureRepository::save)
            .map(koreanCultureMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<KoreanCultureDTO> findAll() {
        log.debug("Request to get all KoreanCultures");
        return koreanCultureRepository.findAll().stream().map(koreanCultureMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<KoreanCultureDTO> findOne(Long id) {
        log.debug("Request to get KoreanCulture : {}", id);
        return koreanCultureRepository.findById(id).map(koreanCultureMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete KoreanCulture : {}", id);
        koreanCultureRepository.deleteById(id);
    }
}
